import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const expensesSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(3).max(100),
  amount: z.number().min(3).max(100),
  createdAt: z.date(),
  updatedAt: z.date(),
});

type Expense = z.infer<typeof expensesSchema>;

const createPostSchema = expensesSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: 'Groceries',
    amount: 50.25,
    createdAt: new Date('2023-05-01'),
    updatedAt: new Date('2023-05-01'),
  },
  {
    id: 2,
    title: 'Gas',
    amount: 40.0,
    createdAt: new Date('2023-05-02'),
    updatedAt: new Date('2023-05-02'),
  },
  {
    id: 3,
    title: 'Movie tickets',
    amount: 25.5,
    createdAt: new Date('2023-05-03'),
    updatedAt: new Date('2023-05-03'),
  },
  {
    id: 4,
    title: 'Dinner',
    amount: 65.75,
    createdAt: new Date('2023-05-04'),
    updatedAt: new Date('2023-05-04'),
  },
  {
    id: 5,
    title: 'Internet bill',
    amount: 79.99,
    createdAt: new Date('2023-05-05'),
    updatedAt: new Date('2023-05-05'),
  },
];

export const expensesRouter = new Hono()
  .get('/', (c) => c.json({ expenses: fakeExpenses }))
  .get('/:id{[0-9]+}', (c) => {
    const id = Number(c.req.param('id'));
    const expense = fakeExpenses.find((e) => e.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .get('/total-spent', (c) => {
    const totalSpent = fakeExpenses.reduce((acc, expense) => {
      return acc + expense.amount;
    }, 0);

    if (isNaN(totalSpent)) {
      return c.json({ totalSpent: 0 });
    }

    return c.json({ totalSpent });
  })
  .post('/', zValidator('json', createPostSchema), (c) => {
    const data = c.req.valid('json');
    const expense = createPostSchema.parse(data);
    const newExpense: Expense = {
      ...expense,
      id: fakeExpenses.length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      amount: Number(expense.amount),
    };
    fakeExpenses.push(newExpense);

    c.status(201);
    return c.json(newExpense);
  })
  .delete('/:id{[0-9]+}', (c) => {
    const id = Number(c.req.param('id'));
    const index = fakeExpenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return c.notFound();
    }

    const deletedExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ expense: deletedExpense });
  });
