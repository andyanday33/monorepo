import {
  Button,
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  IconButton,
  Link,
  styled,
  UserAvatar,
} from "@kampus/ui";
import { Notification, User } from "@prisma/client";
import { PlusIcon } from "@radix-ui/react-icons";
import { useFetcher } from "@remix-run/react";
import { FC, Fragment, useEffect, useState } from "react";
import { MyNotification } from "~/models/notification.server";

const MenuItem = styled(DropdownMenuItem, {
  width: "auto",
  cursor: "pointer",
});

const MenuLink = styled(Link, {
  textDecoration: "none",
});

interface Props {}

export const NotificationDropdown: FC<Props> = (props) => {
  const fetcher = useFetcher();
  const [processedNotifications, setProcessedNotifications] = useState<
    string[]
  >([]);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data == null) {
      fetcher.load("/notifications/my-notifications");
    }
  }, [fetcher]);

  useEffect(() => {
    const messageArray: string[] = [];
    if (fetcher.data)
      (fetcher.data.notifications as MyNotification[]).forEach((notif) => {
        switch (notif.type) {
          case "REPLY":
            messageArray.push(
              `${
                notif.triggeredBy.username
              } isimli kullanıcı şu yorumunuzu yanıtladı: "${notif.comment.content.slice(
                30
              )}..."`
            );
            break;
          case "COMMENT":
            messageArray.push(
              `${notif.triggeredBy.username} isimli kullanıcı "${notif.post.title}" paylaşımınıza bir yorum yaptı.`
            );
            break;
          case "UPVOTECOMMENT":
            messageArray.push(
              `${notif.triggeredBy.username} isimli kullanıcı "${notif.post.title}" paylaşımınızı beğendi.`
            );
            break;
          case "UPVOTEPOST":
            messageArray.push(
              `${
                notif.triggeredBy.username
              } isimli kullanıcı şu yorumunuzu beğendi: "${notif.comment.content.slice(
                30
              )}"`
            );
            break;
        }
        setProcessedNotifications(messageArray);
      });
  }, [fetcher.data]);

  return (
    <DropdownMenu>
      <fetcher.Form method="get" action="/notification/my-notifications">
        <DropdownMenuTrigger asChild>
          <IconButton
            color="transparent"
            css={{
              padding: 0,
              borderRadius: "50%",
              width: "auto",
              height: "auto",
            }}
          >
            <PlusIcon />
          </IconButton>
        </DropdownMenuTrigger>
      </fetcher.Form>

      <DropdownMenuContent sideOffset={5}>
        {processedNotifications &&
          fetcher.data?.notifications.map(
            (notif: MyNotification, index: number) => (
              <Fragment key={notif.id}>
                <MenuLink to={notif.url}>
                  <MenuItem>{processedNotifications[index]}</MenuItem>
                </MenuLink>
                <DropdownMenuSeparator />
              </Fragment>
            )
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
