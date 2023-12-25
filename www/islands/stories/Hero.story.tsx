import Hero from "../../components/Hero.tsx";
import Copyable from "https://deno.land/x/fresh_stories@0.0.11/islands/Copyable.tsx";
export default function Stories() {
  return <Hero />;
}

export const description = (
  <>
    <p>
      You can also write JSX as a description.
    </p>
    <Copyable
      code={`<button
  {...props}
  disabled={!IS_BROWSER || props.disabled}
  class="px-3 py-2 bg-blue-200 text-blue-800 rounded hover:bg-blue-300 active:bg-blue-400"
/>`}
    />
  </>
);
