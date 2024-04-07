import { Avatar, Tab, Tabs } from "@nextui-org/react";
import logo from './8665237_code_development_icon.png';

import FeaturesCards from "./features-cards";
import PromptInputWithBottomActions from "./prompt-input-with-bottom-actions";


export default function Home() {
  return (
    <div className="flex h-full w-full flex-col gap-8 max-w-4xl mx-auto">
      <div className="flex h-full flex-col justify-center gap-10 grow">
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <Avatar
            size="lg"
            className="bg-white"
            src={logo}
          />
          <h1 className="text-xl font-medium text-default-700">How can I help you today?</h1>
        </div>
        <FeaturesCards />
      </div>
      <div className="flex flex-col gap-2">
        <PromptInputWithBottomActions />
        <p className="px-2 text-tiny text-default-400">
          Acme AI can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
}
