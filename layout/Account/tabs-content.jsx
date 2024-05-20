"use client";

import TabSecurity from "#/layout/Account/tab-security";
import TabUser from "#/layout/Account/tab-user";
import TabKeys from "#/layout/Account/tab-keys";

export default function TabsContent({ value }) {
  switch (value) {
    case 0:
      return <TabUser />;
    case 1:
      return <TabKeys />;
    case 2:
      return <TabSecurity />;
    default:
      break;
  }
}
