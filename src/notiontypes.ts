export type NotionPage = {
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: { object: "user"; id: string };
  last_edited_by: { object: "user"; id: string };
  cover: null | string;
  icon: null | string;
  parent: { type: "database_id"; database_id: string };
  archived: boolean;
  in_trash: boolean;
  properties: {
    Slug: {
      id: string;
      type: "rich_text";
      rich_text: Array<{
        type: "text";
        text: { content: string; link: null };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: null;
      }>;
    };
    Published: { id: string; type: "checkbox"; checkbox: boolean };
    Page: {
      id: "title";
      type: "title";
      title: Array<{
        type: "text";
        text: { content: string; link: null };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: null;
      }>;
    };
  };
  url: string;
  public_url: null | string;
};

export type NotionResponse = {
  object: "list";
  results: NotionPage[];
  next_cursor: null | string;
  has_more: boolean;
  type: "page_or_database";
  page_or_database: object;
  request_id: string;
};
