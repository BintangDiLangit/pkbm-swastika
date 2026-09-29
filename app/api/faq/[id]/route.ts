import { itemHandlers } from "@/lib/api/crud";
import { faqResource } from "@/lib/api/resources";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const { PUT, DELETE } = itemHandlers(faqResource);
