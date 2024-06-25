import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import Hero from '../components/Hero'


const Home= () => {
  return (
    <div>
      <Hero/>
    </div>
  )
}

export default Home;