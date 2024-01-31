import { type PropsWithChildren } from "react";
import { Container, Link, Theme } from "@radix-ui/themes";

import { MainNav, MainNavBrand } from "~/features/main-nav";

export default function JobBoardRootLayout({ children }: PropsWithChildren) {
  return (
    <Theme accentColor="teal">
      <MainNav
        brand={<MainNavBrand href="/job-board">Kampus Jobs</MainNavBrand>}
        links={[
          <Link key={1} href="/sozluk">
            sozluk
          </Link>,
          <Link key={2} href="/pano">
            pano
          </Link>,
          <Link key={3} href="/job-board">
            job-board
          </Link>,
        ]}
      />
      <Container size="3" mt="3" mb="3">
        {children}
      </Container>
    </Theme>
  );
}
