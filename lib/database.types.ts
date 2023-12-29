export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null
          id: number
          label: string
          server_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          label: string
          server_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          label?: string
          server_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          }
        ]
      }
      channels: {
        Row: {
          category_id: number | null
          created_at: string | null
          description: string | null
          id: number
          label: string
          unread: boolean | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          label: string
          unread?: boolean | null
        }
        Update: {
          category_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          label?: string
          unread?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "channels_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          channel_id: number | null
          created_at: string | null
          id: number
          profile_id: number | null
          text: string | null
          updated_at: string | null
        }
        Insert: {
          channel_id?: number | null
          created_at?: string | null
          id?: never
          profile_id?: number | null
          text?: string | null
          updated_at?: string | null
        }
        Update: {
          channel_id?: number | null
          created_at?: string | null
          id?: never
          profile_id?: number | null
          text?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          id: number
          name: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          id?: number
          name?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          id?: number
          name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      servers: {
        Row: {
          created_at: string | null
          id: number
          img: string | null
          label: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          img?: string | null
          label: string
        }
        Update: {
          created_at?: string | null
          id?: number
          img?: string | null
          label?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_channel_with_messages: {
        Args: {
          target_channel_id: number
        }
        Returns: {
          channel_id: number
          category_id: number
          channel_label: string
          created_at: string
          unread: boolean
          description: string
          messages: Json
        }[]
      }
      get_servers_with_channels: {
        Args: Record<PropertyKey, never>
        Returns: {
          server_id: number
          server_label: string
          first_category_id: number
          first_channel_id: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
