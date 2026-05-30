import { BrowserRouter } from "react-router-dom"
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from './components'
import { motion } from 'framer-motion';

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-[#3f3131] bg-cover
        bg-no-repeat bg-center relative">
          <Navbar />
          <Hero />
          <div className='bg-secondary w-full flex justify-center items-center py-2'>
            <a href='#about'>
            <div className='w-[35px] h-[64px] rounded-3xl border-4
            border-white-100 flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0]
              }} 
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop'
              }}
              className="w-3 h-3 rounded-full bg-white-100 mb-1"
            />
            </div>
            </a>
          </div>
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <div className="relative z-0">
          <Contact />
        </div>
      </div>
    </BrowserRouter>
   
  )
}

export default App
