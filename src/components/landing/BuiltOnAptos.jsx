import { motion } from 'framer-motion';

export default function BuiltOnAptos() {
  return (
    <section id="built-on-aptos" className="py-12 sm:py-16 md:py-20 relative text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="relative">
          {/* Glowing background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full scale-150" />

          {/* Gradient Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Built on
            </span>
            <br />
            <div className="text-white text-4xl sm:text-5xl md:text-6xl mt-2 sm:mt-4">
              {/* Placeholder for Aptos Logo */}
              <div className="w-48 sm:w-56 md:w-64 h-16 sm:h-18 md:h-20 flex items-center justify-center mx-auto">
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  APTOS
                </span>
              </div>
            </div>
          </motion.h2>
        </div>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
          Leveraging the speed, security, and scalability of the Aptos blockchain to deliver 
          next-generation decentralized finance solutions.
        </p>
      </div>
    </section>
  );
}
