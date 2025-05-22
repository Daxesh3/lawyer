import { Link } from 'react-router-dom';
import { CARD_OPTIONS } from '../../LetterCreation/constants/Letter.constants';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const textVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="grid grid-cols-3 gap-4 mx-12 mt-12">
      {CARD_OPTIONS.map((card, idx) => (
        <motion.div
          key={card}
          whileHover="visible"
          initial="hidden"
          className="relative block bg-[#3b3b3b] rounded-lg group text-white text-center text-lg overflow-hidden"
        >
          <Link to={`/letter`} className="block h-full py-12 px-4">
            {card}
          </Link>
          {idx > 0 && (
            <motion.div
              variants={overlayVariants}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center cursor-not-allowed"
            >
              <motion.span
                variants={textVariants}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="text-white text-sm font-medium"
              >
                Coming Soon....
              </motion.span>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Dashboard;
