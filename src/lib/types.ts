export type TelegramUpdate = {
  update_id: number;
  message: {
    message_id: number;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      username: string;
      language_code: string;
    };
    chat: {
      id: number;
      first_name: string;
      username: string;
      type: string;
    };
    date: number;
    text?: string;
    photo?: {
      file_id: string;
      file_unique_id: string;
      file_size: number;
      width: number;
      height: number;
    }[];
    video?: {
      duration: number;
      width: number;
      height: number;
      file_name: string;
      mime_type: string;
      thumbnail: {
        file_id: string;
        file_unique_id: string;
        file_size: number;
        width: number;
        height: number;
      };
      thumb: {
        file_id: string;
        file_unique_id: string;
        file_size: number;
        width: number;
        height: number;
      };
      file_id: string;
      file_unique_id: string;
      file_size: number;
    };
    document?: {
      file_name: string;
      mime_type: string;
      file_id: string;
      file_unique_id: string;
      file_size: number;
    };
    sticker?: {
      width: number;
      height: number;
      emoji: string;
      set_name: string;
      is_animated: boolean;
      is_video: boolean;
      type: string;
      thumbnail: {
        file_id: string;
        file_unique_id: string;
        file_size: number;
        width: number;
        height: number;
      };
      thumb: {
        file_id: string;
        file_unique_id: string;
        file_size: number;
        width: number;
        height: number;
      };
      file_id: string;
      file_unique_id: string;
      file_size: number;
    };
    entities?: {
      offset: number;
      length: number;
      type: string;
    }[];
  };
};
