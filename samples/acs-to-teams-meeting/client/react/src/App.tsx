import {
  AzureCommunicationTokenCredential, 
  CommunicationUserIdentifier 
} from '@azure/communication-common';
import {  
  CallComposite,
  fromFlatCommunicationIdentifier,
  useAzureCommunicationCallAdapter
} from '@azure/communication-react';
import { useState, useMemo, useEffect } from 'react';
import './App.css';

const App = () => {
  const displayName = 'Guest';
  
  //const [userId, setUserId] = useState<string>('8:acs:3d50c7fe-dc2c-4a48-b3fc-be7144fc5bd9_00000019-7766-d3a6-9b76-c93a0d00ad4b');
  //const [token, setToken] = useState<string>('eyJhbGciOiJSUzI1NiIsImtpZCI6IjVFODQ4MjE0Qzc3MDczQUU1QzJCREU1Q0NENTQ0ODlEREYyQzRDODQiLCJ4NXQiOiJYb1NDRk1kd2M2NWNLOTVjelZSSW5kOHNUSVEiLCJ0eXAiOiJKV1QifQ.eyJza3lwZWlkIjoiYWNzOjNkNTBjN2ZlLWRjMmMtNGE0OC1iM2ZjLWJlNzE0NGZjNWJkOV8wMDAwMDAxOS03NzY2LWQzYTYtOWI3Ni1jOTNhMGQwMGFkNGIiLCJzY3AiOjE3OTIsImNzaSI6IjE2ODcyNDMwMDkiLCJleHAiOjE2ODczMjk0MDksInJnbiI6ImFwYWMiLCJhY3NTY29wZSI6InZvaXAiLCJyZXNvdXJjZUlkIjoiM2Q1MGM3ZmUtZGMyYy00YTQ4LWIzZmMtYmU3MTQ0ZmM1YmQ5IiwicmVzb3VyY2VMb2NhdGlvbiI6ImFzaWFwYWNpZmljIiwiaWF0IjoxNjg3MjQzMDA5fQ.XRfxQWqv6Zm8anTzFudjhem6cN0PlLk2ZLkuAz5E5ET8mX1fz56HRSwCShuMP40VbSpV-aGcqkJXciQC9nbDzoAcYOdd3tNUg9a5QNzUrp6Obdpukc3E36wEaVM3OTrU-NZ-1IfLzg0BCH7GaGzl2-PxIbfKtcfz2jySIrSEA2XE8wJfiancXcHLuVLCsLEnZVGOe3YNaTLJgevc6c_9ZY8fCwEv7TF2g7_QIaQdSAFB6JUBXKWjPAK_vhb0YBHwtbuu1_3GsT61MFEZLZwvMkQbroIpxFldP7C1JqaONSsWMD6GkGm14k1bAEdyiK0vCDFWgaDOLpL736t8Wg4s8Q');
  //const [teamsMeetingLink, setTeamsMeetingLink] = useState<string>('https://teams.microsoft.com/l/meetup-join/19%3ameeting_MzRjZjEzMTUtOGE1Yy00MzM3LTkzZmUtMGVjMzQ3YTVhYjA0%40thread.v2/0?context=%7b%22Tid%22%3a%22f055188a-0916-40fd-aeed-2ba499834c94%22%2c%22Oid%22%3a%222bb90954-9eb0-44f5-93e8-c36d96844fa9%22%7d');
  
  const [userId, setUserId] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [teamsMeetingLink, setTeamsMeetingLink] = useState<string>('');

  const [message, setMessage] = useState<string>('');
  
  const credential = useMemo(() => {
    if (token) {
      return new AzureCommunicationTokenCredential(token);
    }
    return;
  }, [token]);

  const callAdapterArgs = useMemo(() => {
    if (userId && credential && displayName && teamsMeetingLink) {
      return {
        userId: fromFlatCommunicationIdentifier(userId) as CommunicationUserIdentifier,
        displayName,
        credential,
        locator: { meetingLink: teamsMeetingLink },
      }
    }
    return {};
  }, [userId, credential, displayName, teamsMeetingLink]);

  const callAdapter = useAzureCommunicationCallAdapter(callAdapterArgs);

  useEffect(() => {
    const init = async () => {
      
      setMessage('Getting ACS user');
      //Call Azure Function to get the ACS user identity and token
      const res = await fetch(process.env.REACT_APP_ACS_USER_FUNCTION as string);
      const user = await res.json();
      setUserId(user.userId);
      setToken(user.token);
      

      setMessage('Getting Teams meeting link...');
      //Call Azure Function to get the meeting link
      const resTeams = await fetch(process.env.REACT_APP_TEAMS_MEETING_FUNCTION as string);
      const link = await resTeams.text();
      setTeamsMeetingLink(link);
      setMessage('');
      console.log('Teams meeting link', link);
    }
    init();
  }, []);

  if (callAdapter) {
    return (
      <div>
        <h1>Contact Customer Service</h1>
        <div className="wrapper">
          <CallComposite
            adapter={callAdapter}
          />
        </div>
      </div>
    );
  }
  if (!credential) {
    return <>Failed to construct credential. Provided token is malformed.</>;
  }
  if (message) {
    return <div>{message}</div>;
  }
  return <div>Initializing...</div>;
};

export default App;