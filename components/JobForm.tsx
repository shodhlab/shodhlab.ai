'use client';

import { submitJobApplication } from 'app/jobs/[slug]/actions';
import { useFormik } from 'formik';
import { TJobFormValues } from 'lib/types';
import { FC, useState } from 'react';

interface IProps {
	role: string;
	submitAction?: (values: TJobFormValues) => void;
}

const JobForm: FC<IProps> = ({ role }) => {
	const formik = useFormik<TJobFormValues>({
		initialValues: {
			role,
			name: '',
			description: '',
			projects: '',
			linkedin: '',
		},
		onSubmit: (values) => {
			if (isDisabled) return;

			setDisabled(true);
			submitJobApplication(values);
			setSubmitted(true);
		},
	});

	const [isDisabled, setDisabled] = useState<boolean>(false);
	const [submitted, setSubmitted] = useState<boolean>(false);

	return (
		<div className='flex flex-col gap-4 my-4 border rounded-lg lg:my-0 border-neutral-700 bg-neutral-900'>
			<p className='p-4 text-white border-b border-neutral-700'>
				Ready to work with us?
			</p>

			{submitted && (
				<p className='mb-4 text-sm text-center text-gray-400 lg:text-xl text-balance'>
					Thanks for submitting your application. We will get back to
					you shortly!
				</p>
			)}

			{!submitted && (
				<form
					onSubmit={formik.handleSubmit}
					className='flex flex-col px-4 text-sm font-light'
				>
					<label
						htmlFor='full_name'
						className='my-2 text-neutral-500'
					>
						Full name
					</label>
					<input
						type='text'
						name='name'
						placeholder='John Doe'
						value={formik.values.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className='p-2 mb-4 border rounded border-neutral-700 bg-neutral-800 text-neutral-300'
					/>

					<label
						htmlFor='description'
						className='my-2 text-neutral-500'
					>
						Why you are apt for this role
					</label>
					<textarea
						rows={4}
						name='description'
						value={formik.values.description}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						placeholder='I am interested in shodh.ai for my team and I would like to learn more about...'
						className='p-2 mb-4 border rounded border-neutral-700 bg-neutral-800 text-neutral-300'
					/>

					<label htmlFor='projects' className='my-2 text-neutral-500'>
						Provide a few links of any projects that you have worked
						on
					</label>
					<textarea
						rows={4}
						name='projects'
						value={formik.values.projects}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						placeholder='I am interested in shodh.ai for my team and I would like to learn more about...'
						className='p-2 mb-4 border rounded border-neutral-700 bg-neutral-800 text-neutral-300'
					/>

					<label htmlFor='linkedin' className='my-2 text-neutral-500'>
						LinkedIn Profile
					</label>
					<input
						type='text'
						name='linkedin'
						value={formik.values.linkedin}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						placeholder='https://www.linkedin.com/company/shodhlab/about/'
						className='p-2 mb-4 border rounded border-neutral-700 bg-neutral-800 text-neutral-300'
					/>

					<div className='flex items-center justify-end my-4'>
						<button
							type='submit'
							className='w-1/2 px-6 py-3 text-xs border rounded-full lg:w-auto border-neutral-700 text-neutral-300 hover:text-white hover:bg-gradient-to-b from-blue-500 to-blue-600'
							disabled={isDisabled}
						>
							Apply Now
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default JobForm;
