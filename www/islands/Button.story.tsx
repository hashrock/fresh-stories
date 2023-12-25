import { Button } from "../components/Button.tsx";
import ColoredButton from "./ColoredButton.tsx";

export default function Stories() {
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

export const description = `
# You can use markdown here

\`\`\`tsx
<ColoredButton>
  Usage
</ColoredButton>
\`\`\`


`;
