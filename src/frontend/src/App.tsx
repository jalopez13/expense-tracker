import { useEffect, useState } from 'react';
import { cn } from './lib/utils';
import './App.css';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const App = () => {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const getTotalSpent = async () => {
      try {
        const response = await fetch('/api/expenses/total-spent');
        const data = await response.json();
        setTotalSpent(data.totalSpent);
      } catch (error) {
        console.error(error);
      }
    };
    getTotalSpent();
  }, []);

  return (
    <>
      <Card
        className={cn(
          'w-full max-w-[300px] text-left bg-[#181818] shadow-md rounded-md border-none',
        )}
      >
        <CardHeader className={cn('p-4')}>
          <CardTitle
            className={cn('text-2xl font-bold text-foreground tracking-wide')}
          >
            Total Spent
          </CardTitle>
          <CardDescription
            className={cn('text-sm text-[#b3b3b3] tracking-wide')}
          >
            Total amount you've spent.
          </CardDescription>
        </CardHeader>
        <CardContent className={cn('p-4')}>
          <p className={cn('text-3xl font-bold text-white')}>stuff here</p>
        </CardContent>
        <CardFooter className={cn('p-4 border-t border-[#282828]')}>
          <p className={cn('text-sm text-[#b3b3b3]')}>{totalSpent}</p>
        </CardFooter>
      </Card>
    </>
  );
};

export default App;
