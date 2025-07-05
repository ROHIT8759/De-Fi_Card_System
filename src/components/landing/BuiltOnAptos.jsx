import { motion } from "framer-motion";

export default function BuiltOnAptos() {
  return (
    <section
      id="built-on-aptos"
      className="py-12 sm:py-16 md:py-20 relative text-white max-w-4xl mx-auto px-4 sm:px-6 flex gap-6 flex-wrap md:flex-nowrap justify-center align-middle"
    >
      <img src="/apo.png" className="max-w-lg" />

      {/* Description */}
      <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto px-4">
        Leveraging the speed, security, and scalability of the Aptos blockchain
        to deliver next-generation decentralized finance solutions.
      </p>
    </section>
  );
}
