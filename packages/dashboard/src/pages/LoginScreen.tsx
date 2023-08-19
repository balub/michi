import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import Container from "@/components/container";

function LoginScreen() {
  return (
    <Container>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login to Dashboard
            </h1>
          </div>
          <Button variant="outline" type="button">
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button variant="outline" type="button">
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Github
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default LoginScreen;
