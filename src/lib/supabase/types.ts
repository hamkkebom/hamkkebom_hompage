/**
 * 홈페이지가 쓰는 테이블만 손으로 옮긴 Supabase 타입.
 * (같은 프로젝트를 다른 서비스와 공유하므로 전체 생성 타입 대신 필요한 부분만 둔다)
 */
export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      briefing_sessions: {
        Row: {
          capacity: number | null;
          created_at: string;
          id: string;
          is_open: boolean;
          label: string;
          location: string | null;
          starts_on: string;
        };
        Insert: {
          capacity?: number | null;
          created_at?: string;
          id?: string;
          is_open?: boolean;
          label: string;
          location?: string | null;
          starts_on: string;
        };
        Update: {
          capacity?: number | null;
          created_at?: string;
          id?: string;
          is_open?: boolean;
          label?: string;
          location?: string | null;
          starts_on?: string;
        };
        Relationships: [];
      };
      briefing_applications: {
        Row: {
          admin_memo: string | null;
          created_at: string;
          email: string | null;
          experience: string | null;
          id: string;
          interests: string[];
          marketing_consent: boolean;
          message: string | null;
          name: string;
          phone: string;
          privacy_consent: boolean;
          session_id: string | null;
          source: string | null;
          status: string;
          updated_at: string;
        };
        Insert: {
          admin_memo?: string | null;
          created_at?: string;
          email?: string | null;
          experience?: string | null;
          id?: string;
          interests?: string[];
          marketing_consent?: boolean;
          message?: string | null;
          name: string;
          phone: string;
          privacy_consent: boolean;
          session_id?: string | null;
          source?: string | null;
          status?: string;
          updated_at?: string;
        };
        Update: {
          admin_memo?: string | null;
          created_at?: string;
          email?: string | null;
          experience?: string | null;
          id?: string;
          interests?: string[];
          marketing_consent?: boolean;
          message?: string | null;
          name?: string;
          phone?: string;
          privacy_consent?: boolean;
          session_id?: string | null;
          source?: string | null;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "briefing_applications_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "briefing_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      site_admins: {
        Row: {
          created_at: string;
          email: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      is_site_admin: { Args: never; Returns: boolean };
      submit_briefing_application: {
        Args: {
          p_session_id: string | null;
          p_name: string;
          p_phone: string;
          p_email: string | null;
          p_interests: string[];
          p_experience: string | null;
          p_message: string | null;
          p_privacy_consent: boolean;
          p_marketing_consent: boolean;
          p_source: string;
        };
        Returns: string;
      };
    };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
