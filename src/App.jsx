import { useEffect, useRef, useState } from "react";

import Message from "./components/Message"
import { Box, Button, Container, FormControl, HStack, Input, VStack } from "@chakra-ui/react"

import { app } from "./firebase"
import { getAuth, GoogleAuthProvider, signInWithPopup, signInAnonymously, onAuthStateChanged, signOut } from "firebase/auth"
import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore"

const auth = getAuth(app);
const db = getFirestore(app);

const handleSignInWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider();
  signInWithPopup(auth, googleProvider);
}

const handleSignInAnonymously = () => { signInAnonymously(auth) }

const handleSignOut = () => { signOut(auth) }


function App() {

  // user 
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));
  const refForScroll = useRef(null);

  useEffect(() => {
    if (refForScroll.current)
      refForScroll.current.scrollIntoView({ scrollBehavior: "smooth" });
  }, [messages, user])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    })

    onSnapshot(q, (snap) => {
      const data = snap.docs.map(item => {
        const id = item.id;
        return { id, ...item.data() };
      });
      setMessages(data);
      // refForScroll.current.scrollIntoView({ scrollBehavior: "smooth" });
    })
  }, [])

  const handleChange = (e) => { setMessage(e.target.value) }

  const handleSendMessage = async () => {
    try {
      setMessage("");

      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      alert(error);
    }
  }

  // login render
  if (!user) return (
    <Box className="gradient">
      <VStack justifyContent={"center"} h={"100vh"}>
        <Button onClick={handleSignInWithGoogle} colorScheme="purple" >Sign in with Google</Button>
        <Button onClick={handleSignInAnonymously} colorScheme="none">Sign in Anonymously</Button>
      </VStack >
    </Box>
  )

  // homescreen render
  if (user) return (
    <Box h={"100vh"} className="gradient">
      <Container h={"100vh"} bg={"white"} rounded={"md"} bgGradient={'linear(to-br, red.100, purple.100)'}>
        <VStack py={"1"} h={"full"}>
          <Button w={"full"} colorScheme="red" onClick={handleSignOut}>Logout</Button>

          <VStack h={"full"} w={"full"} overflow={"auto"} scrollBehavior={"smooth"}>
            {
              messages.map(item => (
                <Message
                  key={item.id}
                  text={item.text}
                  uri={item.uri}
                  user={item.uid === user.uid ? "me" : "other"}
                />
              ))
            }
            <div ref={refForScroll}></div>
          </VStack>

          <FormControl>
            <HStack>
              <Input placeholder="type your message" value={message} onChange={handleChange}></Input>
              <Button colorScheme="green" onClick={handleSendMessage}>Send</Button>
            </HStack>
          </FormControl>

        </VStack>
      </Container>
    </Box>
  )
}

export default App
