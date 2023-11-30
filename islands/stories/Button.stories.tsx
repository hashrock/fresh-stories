import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Button } from "../../components/Button.tsx";
import ColoredButton from "../ColoredButton.tsx";

export default function Stories(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <>
      <div class="space-y-4">
        <div>
          <Button>
            MyButton
          </Button>
        </div>

        <div>
          <ColoredButton>
            Colored
          </ColoredButton>
        </div>
      </div>
    </>
  );
}
