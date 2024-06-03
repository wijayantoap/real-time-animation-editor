import { Box, IconButton, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useRef, useState } from 'react';
import supabase from '../client/supabase';
import useSession from '../hooks/useSession';
import { useParams } from 'react-router-dom';

interface ChatTabProps {
  setChatHistory?: React.Dispatch<React.SetStateAction<any>>;
}

const ChatTab: React.FC<ChatTabProps> = ({ setChatHistory }) => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  let params = useParams();
  const { data, loading } = useSession();

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  async function sendMessage(userId: string = '', userName: string = '', workspaceId: string = '') {
    const payload = {
      userId,
      userName,
      workspaceId,
      message: text,
      timestamp: new Date(),
    };
    setText('');
    const { error } = await supabase.from('chats').insert([payload]);

    if (error) {
      console.error('Error sending message:', error);
    }
  }

  const formatDate = (time: Date): string => {
    const date = new Date(time);
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1;
    const year: number = date.getFullYear();
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();

    const formattedDay: string = day < 10 ? '0' + day : String(day);
    const formattedMonth: string = month < 10 ? '0' + month : String(month);
    const formattedHours: string = hours < 10 ? '0' + hours : String(hours);
    const formattedMinutes: string = minutes < 10 ? '0' + minutes : String(minutes);

    return `${formattedHours}:${formattedMinutes} ${formattedDay}/${formattedMonth}/${year}`;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const channel = supabase.channel('table_chats_changes');

    const fetchInitialMessages = async () => {
      const { data, error } = await supabase.from('chats').select('*').eq('workspaceId', params?.workspaceId).order('timestamp', { ascending: true }); // Fetch messages in chronological order

      if (error) {
        console.error('Error fetching initial messages:', error);
      } else {
        setMessages(data);
      }
    };

    const subscribeToMessages = () => {
      channel
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'chats',
            filter: `workspaceId=eq.${params?.workspaceId}`,
          },
          (payload) => {
            const newRecord = payload.new;
            console.log(newRecord);
            setMessages((prevState) => [...prevState, newRecord]);
          },
        )
        .subscribe();

      console.log(supabase.realtime.connectionState());
    };

    if (params?.workspaceId) {
      fetchInitialMessages();
      subscribeToMessages();
    }

    return () => {
      supabase.removeChannel(channel);
    };
  }, [params?.workspaceId]);

  if (!data && !loading) return null;

  return (
    <Box sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          height: '90%',
          maxHeight: '80vh',
          overflow: 'hidden',
          overflowY: 'scroll',
        }}
      >
        {messages?.map((item) => (
          <Box
            sx={{
              p: 1,
              backgroundColor: '#00DDB3',
              borderRadius: 2,
              mb: 1,
            }}
          >
            <Typography variant="caption" fontWeight="bold">
              {item?.userName}
            </Typography>
            <Typography>{item?.message}</Typography>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ flex: 1 }} />
              <Typography variant="caption">{formatDate(item?.timestamp)}</Typography>
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          value={text}
          fullWidth
          placeholder="Type something to chat"
          InputProps={{
            endAdornment: (
              <IconButton>
                <SendIcon sx={{ color: 'primary.main' }} />
              </IconButton>
            ),
          }}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              sendMessage(data?.user?.id, data?.user?.email, params?.workspaceId);
              ev.preventDefault();
            }
          }}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </Box>
    </Box>
  );
};

export default ChatTab;
