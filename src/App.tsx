import { useTranslation } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import LanguageSwitcher from "./languages/LanguageSwitcher";
import { router } from "./appPaths";

import "./App.css";

export const App = () => {
  const { t } = useTranslation();

  return (
    <>
      <RouterProvider router={router} />
      <LanguageSwitcher />
      <p>{t("translation.read-the-docs")}</p>
    </>
  );
};
