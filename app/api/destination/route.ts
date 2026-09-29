import { collectionHandlers } from "@/lib/api/crud";
import { destinationResource } from "@/lib/api/resources";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const { GET, POST } = collectionHandlers(destinationResource);
