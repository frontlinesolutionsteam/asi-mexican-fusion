import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { site, menu, menuCategories, catering, story } from "@/config/site";
import { getOpenState, hoursLabel, formatPrice } from "@/lib/format";

export const runtime = "nodejs";

// TODO(chatbot): add ANTHROPIC_API_KEY to .env.local to enable live answers.
// Without it, the widget still works — it returns a friendly canned fallback.
const apiKey = process.env.ANTHROPIC_API_KEY;

function buildSystemPrompt(): string {
  const open = getOpenState();
  const hoursText = site.hours
    .map((h) => `${h.day}: ${hoursLabel(h)}`)
    .join("\n");
  const menuText = menuCategories
    .map((cat) => {
      const items = menu
        .filter((m) => m.categoryId === cat.id)
        .map((m) => `  - ${m.name} (${formatPrice(m.price)}): ${m.description}`)
        .join("\n");
      return `${cat.name}:\n${items}`;
    })
    .join("\n\n");

  return `You are the friendly virtual host for ${site.name}, a family-owned, HALAL Mexican–Middle Eastern (Mexican–Jordanian) fusion bistro in San Jose, CA. Tagline: "${site.tagline}."

VOICE: warm, welcoming, a little playful. You may sprinkle light Spanish ("¡Hola!", "¡Buen provecho!") but keep it natural. Keep answers short (1-4 sentences). Never invent menu items or prices that aren't listed. If you don't know something, offer the phone number ${site.contact.phone}.

KEY FACTS:
- ALL food is halal. Founded January 2024 by ${story.founders}.
- Signature butterfly mural: one wing the flag of Mexico, one the flag of Jordan — two cultures, one family, one kitchen.
- Address: ${site.contact.address.street}, ${site.contact.address.city}, ${site.contact.address.state} ${site.contact.address.zip}. Phone: ${site.contact.phone}.
- Parking: ${site.contact.parkingNote}
- Right now it is ${open.isOpen ? "OPEN" : "CLOSED"} (${open.label}).
- Ordering for pickup: available right on our Menu page — add items to cart and check out.
- Delivery: available through DoorDash (we don't run our own delivery). If someone asks about delivery, point them to the "Delivery" button on our homepage or tell them to search "${site.name}" on DoorDash.
- Catering: yes! ${catering.blurb} Minimum ${catering.minGuests} guests, ${catering.leadTimeDays} days notice. Point people to the Catering page.
- Dietary: every dish is halal. We have vegetarian options across categories (marked "Vegetarian" on the menu) — falafel, hummus, shakshuka, sides, and more.

HOURS:
${hoursText}

MENU:
${menuText}

SIGNATURE SAUCES: tahini-chipotle crema, salsa macha, toum (garlic), salsa verde.

When someone wants to order, encourage them to use the Menu page ("You can add it right from our Menu page"). Always be encouraging and appetizing.`;
}

export async function POST(req: Request) {
  const fallback = `Thanks for reaching out! I can't connect to the assistant right now, but our team is happy to help — call us at ${site.contact.phone} or check the Menu and Location pages. ¡Gracias!`;

  try {
    const { messages } = (await req.json()) as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    if (!apiKey) {
      return NextResponse.json({ reply: fallback, fallback: true });
    }

    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system: buildSystemPrompt(),
      messages: messages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
    });

    const reply = response.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { text: string }).text)
      .join("\n")
      .trim();

    return NextResponse.json({ reply: reply || fallback });
  } catch (err) {
    console.error("[chat] error", err);
    return NextResponse.json({ reply: fallback, fallback: true });
  }
}
