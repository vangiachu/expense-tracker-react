import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import categories from '../categories';

const schema = z.object({
	description: z
		.string()
		.min(3, { message: 'Description should be at least 3 characters. ' })
		.max(50),
	amount: z
		.number({ invalid_type_error: 'Amount is required.' })
		.min(0.01)
		.max(100_000),
	category: z.enum(categories, {
		errorMap: () => ({ message: 'Category is required.' }),
	}),
});

type ExpenseForm = z.infer<typeof schema>;

interface Props {
	onSubmit: (data: ExpenseForm) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ExpenseForm>({ resolver: zodResolver(schema) });

	return (
		<form
			onSubmit={handleSubmit((data) => {
				onSubmit(data);
				reset();
			})}
		>
			<div className="mb-3">
				<label htmlFor="description" className="form-label">
					Description
				</label>
				<input
					{...register('description')}
					id="description"
					type="text"
					className="form-control"
				/>
				{errors.description && (
					<p className="text-danger">{errors.description.message}</p>
				)}
			</div>
			<div className="mb-3">
				<label htmlFor="amount" className="form-label"></label>Amount
				<input
					{...register('amount', { valueAsNumber: true })}
					id="amount"
					type="number"
					className="form-control"
				/>
				{errors.amount && (
					<p className="text-danger">{errors.amount.message}</p>
				)}
			</div>
			<div className="mb-3">
				<label htmlFor="category" className="form-label">
					Category
				</label>
				<select {...register('category')} id="category" className="form-select">
					<option value=""></option>
					{categories.map((category) => (
						<option key={category}>{category}</option>
					))}
				</select>
				{errors.category && (
					<p className="text-danger">{errors.category.message}</p>
				)}
			</div>
			<button className="btn btn-primary">Submit</button>
		</form>
	);
};

export default ExpenseForm;
