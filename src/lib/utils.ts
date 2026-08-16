/**
 * The vendored motion primitives import `@/lib/utils`, which is where the
 * upstream project keeps its `cn`. This site keeps shared helpers under
 * `shared/lib`, so re-export rather than maintaining the helper twice.
 */
export { cn } from "@/shared/lib/utils";
