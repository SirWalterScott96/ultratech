import { cookies, headers } from "next/headers";
import fs from "fs/promises";
import fetch from "node-fetch";
import https from "https";
import { NextResponse } from "next/server";

export async function POST() {
  // Set timezone (in Next.js this is typically handled at the system level)
  // But you can use packages like 'dayjs' or 'date-fns' for timezone handling

  // Get cookies
  const cookieStore = await cookies();
  const headerStore = await headers();
  const accessToken = cookieStore.get("token")?.value;
  const pixelId = cookieStore.get("fbpixel")?.value;
  const fbclidCookie = cookieStore.get("fbclid")?.value;
  const agent = new https.Agent({
    rejectUnauthorized: false, // <== ВІДКЛЮЧАЄ SSL-ПЕРЕВІРКУ
  });

  if (!accessToken || !pixelId) {
    return NextResponse.json(
      { error: "Missing required cookies (token or fbpixel)" },
      { status: 400 }
    );
  }

  const url = `https://graph.facebook.com/v17.0/${pixelId}/events?access_token=${accessToken}`;
  const timestamp = Math.floor(Date.now() / 1000);
  const rand = Math.floor(Math.random() * 9999) + 1;

  // Process fbclid
  const fbclid = fbclidCookie ? `fb.1.${timestamp}.${fbclidCookie}` : null;

  // Get client information
  const userAgent = headerStore.get("user-agent") || "";
  const ipAddress =
    headerStore.get("cf-connecting-ip") ||
    headerStore.get("x-forwarded-for") ||
    "127.0.0.1"; // fallback

  // Get host for event_source_url
  const forwardedHost = headerStore.get("x-forwarded-host");
  const host = forwardedHost || headerStore.get("host") || "unknown-host";

  // Prepare data to send
  const dataToFb = {
    action_source: "website",
    event_name: "Lead",
    event_time: timestamp,
    event_source_url: `https://${host}`,
    user_data: {
      client_ip_address: ipAddress,
      client_user_agent: userAgent,
      fbc: fbclid,
      fbp: `fb.1.${timestamp}.${rand}`,
    },
  };

  // Send request using fetch instead of cURL
  let response;
  let responseText;

  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `data=[${JSON.stringify(dataToFb)}]`,
      agent,
    });

    responseText = await response.text();
    console.log(responseText);
  } catch (error) {
    responseText = `Error: ${error}`;
    return NextResponse.json({ error: responseText }, { status: 500 });
  }

  // Log to file
  try {
    const filename = "/tmp/lead_facebook_log.txt";

    let existingText = "";
    try {
      existingText = await fs.readFile(filename, "utf8");
    } catch (err) {
      // File doesn't exist yet, that's fine
      console.log(err);
    }

    const logText =
      `${existingText}\n\n------------------------------------` +
      `\n\nDate: ${new Date().toLocaleString("en-US", {
        timeZone: "Etc/GMT-3",
      })}` +
      `\n\nAction: Lead` +
      `\n\nFB Click ID Empty? ${!fbclid}` +
      `\n\nURL: ${url}` +
      `\n\nipAddress: ${ipAddress}` +
      `\n\nData: ${JSON.stringify(dataToFb)}` +
      `\n\nResponse: ${responseText}`;

    await fs.writeFile(filename, logText, "utf8");
  } catch (error) {
    console.error("Failed to write log file:", error);
    // We don't want to fail the request if just the logging fails
  }

  return NextResponse.json({ success: true });
}
