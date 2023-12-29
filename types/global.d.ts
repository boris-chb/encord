import { Database } from '@/lib/database.types';

// Define a utility type to extract a row type for a given table
// type RowType<TableName extends keyof Database['public']['Tables']> = Database['public']['Tables'][TableName]['Row'];

type RowType<TableName extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][TableName]['Row'];

declare global {
  // Primitive Entities
  type Channel = RowType<'channels'>;
  type Category = RowType<'categories'>;
  type Profile = RowType<'profiles'>;
  type Message = RowType<'messages'>;
  type ServersWithChannels =
    Database['public']['Functions']['get_servers_with_channels']['Returns'];

  //   Combined types
  type MessageWithUserProfile = Message & {
    user: Profile;
  };
  type ChannelWithMessages = Channel & { messages: MessageWithUserProfile[] };
}
