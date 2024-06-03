import { useEffect, useRef, useState } from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import supabase from '../client/supabase';
import SendIcon from '@mui/icons-material/Send';
import { formatDateTime } from '../helper/dateHelper';
import useSession from '../hooks/useSession';
import colors from '../constants/colors';

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
            setMessages((prevState) => [...prevState, newRecord]);
          },
        )
        .subscribe();
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
              backgroundColor: colors.secondary,
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
              <Typography variant="caption">{formatDateTime(item?.timestamp)}</Typography>
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
              <IconButton onClick={() => sendMessage(data?.user?.id, data?.user?.email, params?.workspaceId)}>
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
