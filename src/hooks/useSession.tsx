import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import supabase from '../client/supabase';

interface UseSessionResult {
  data: Session | null;
  error: Error | null;
  loading: boolean;
}

const useSession = (): UseSessionResult => {
  const [data, setData] = useState<Session | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        setData(data.session);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  return { data, error, loading };
};

export default useSession;
