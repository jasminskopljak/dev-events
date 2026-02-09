import {NextRequest, NextResponse} from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Event from "@/database/event.model";

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(req: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    await connectToDatabase();

    const { slug } = await params;

    if (!slug || slug.trim() === "") {
      return NextResponse.json({ message: "Invalid or missing slug parameter"}, { status: 400 });
    }

    const sanitizedSlug = slug.trim().toLowerCase();
    const event = await Event.findOne({ slug: sanitizedSlug }).lean();

    if (!event) {
      return NextResponse.json({ message: `Event with slug '${sanitizedSlug}' not found`}, { status: 400 });
    }

    return NextResponse.json({ message: "Event fetched successfully", event}, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      // handle database connection error
      if (error.message.includes("MONGODB_URI")) {
        return NextResponse.json({ message: "Database configuration error"}, { status: 500 });
      }

      // Return a generic error with an error message
      return NextResponse.json({ message: "Failed to fetch event", error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "An unexpected error occurred"}, { status: 500 });
  }
}