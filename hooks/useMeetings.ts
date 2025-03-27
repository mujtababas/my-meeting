'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

interface Meeting {
  id: string;
  callId: string;
  description: string | null;
  startsAt: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export function useMeetings() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const fetchMeetings = async () => {
      if (!isSignedIn) return;
      
      try {
        setIsLoading(true);
        const response = await fetch('/api/meetings');
        
        if (!response.ok) {
          throw new Error('Failed to fetch meetings');
        }
        
        const data = await response.json();
        setMeetings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, [isSignedIn]);

  return { meetings, isLoading, error };
}
