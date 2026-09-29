import { collectionHandlers } from "@/lib/api/crud";
import { quickLinkResource } from "@/lib/api/resources";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const { GET, POST } = collectionHandlers(quickLinkResource);
