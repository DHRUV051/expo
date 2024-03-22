const ExamInput = ({ exam, scoreRanges, register, errors }) => {
  const { reading, writing, listening, speaking, overall } = scoreRanges[exam]

  return (
    <div key={exam}>
      <div>
        <label
          htmlFor={`${exam}-reading`}
          className='text-[rgb(102,102,102)] text-[12px] leading-[18px] font-semibold mb-2'
        >
          {exam} Reading Score
        </label>
        <input
          type='text'
          id={`${exam}-reading`}
          className={`w-full p-2 border-[2px] border-input rounded-[8px] placeholder:text-[16px] placeholder:leading-[20px] ${
            errors[`${exam}-reading`] ? 'border-red-500' : ''
          }`}
          placeholder={`Enter ${exam} Reading Score`}
          {...register(`${exam}-reading`, {
            required: `${exam} reading score is required`,
            pattern: {
              value: /^[0-9](\.[05])?$/,
              message: `${exam} reading score must be between ${reading.min}-${reading.max}`
            }
          })}
        />
        {errors[`${exam}-reading`] && (
          <span className='text-red-500 text-[12px] leading-[18px] mt-1'>{errors[`${exam}-reading`].message}</span>
        )}
      </div>
      <div>
        <label
          htmlFor={`${exam}-writing`}
          className='text-[rgb(102,102,102)] text-[12px] leading-[18px] font-semibold mb-2'
        >
          {exam} Writing Score
        </label>
        <input
          type='text'
          id={`${exam}-writing`}
          className={`w-full p-2 border-[2px] border-input rounded-[8px] placeholder:text-[16px] placeholder:leading-[20px] ${
            errors[`${exam}-writing`] ? 'border-red-500' : ''
          }`}
          placeholder={`Enter ${exam} Writing Score`}
          {...register(`${exam}-writing`, {
            required: `${exam} writing score is required`,
            pattern: {
              value: /^[0-9](\.[05])?$/,
              message: `${exam} writing score must be between ${writing.min}-${writing.max}`
            }
          })}
        />
        {errors[`${exam}-writing`] && (
          <span className='text-red-500 text-[12px] leading-[18px] mt-1'>{errors[`${exam}-writing`].message}</span>
        )}
      </div>
      <div>
        <label
          htmlFor={`${exam}-listening`}
          className='text-[rgb(102,102,102)] text-[12px] leading-[18px] font-semibold mb-2'
        >
          {exam} Listening Score
        </label>
        <input
          type='text'
          id={`${exam}-listening`}
          className={`w-full p-2 border-[2px] border-input rounded-[8px] placeholder:text-[16px] placeholder:leading-[20px] ${
            errors[`${exam}-listening`] ? 'border-red-500' : ''
          }`}
          placeholder={`Enter ${exam} Listening Score`}
          {...register(`${exam}-listening`, {
            required: `${exam} listening score is required`,
            pattern: {
              value: /^[0-9](\.[05])?$/,
              message: `${exam} listening score must be between ${listening.min}-${listening.max}`
            }
          })}
        />
        {errors[`${exam}-listening`] && (
          <span className='text-red-500 text-[12px] leading-[18px] mt-1'>{errors[`${exam}-listening`].message}</span>
        )}
      </div>
      <div>
        <label
          htmlFor={`${exam}-speaking`}
          className='text-[rgb(102,102,102)] text-[12px] leading-[18px] font-semibold mb-2'
        >
          {exam} Speaking Score
        </label>
        <input
          type='text'
          id={`${exam}-speaking`}
          className={`w-full p-2 border-[2px] border-input rounded-[8px] placeholder:text-[16px] placeholder:leading-[20px] ${
            errors[`${exam}-speaking`] ? 'border-red-500' : ''
          }`}
          placeholder={`Enter ${exam} Speaking Score`}
          {...register(`${exam}-speaking`, {
            required: `${exam} speaking score is required`,
            pattern: {
              value: /^[0-9](\.[05])?$/,
              message: `${exam} speaking score must be between ${speaking.min}-${speaking.max}`
            }
          })}
        />
        {errors[`${exam}-speaking`] && (
          <span className='text-red-500 text-[12px] leading-[18px] mt-1'>{errors[`${exam}-speaking`].message}</span>
        )}
      </div>
      <div>
        <label
          htmlFor={`${exam}-overall`}
          className='text-[rgb(102,102,102)] text-[12px] leading-[18px] font-semibold mb-2'
        >
          {exam} Overall Score
        </label>
        <input
          type='text'
          id={`${exam}-overall`}
          className={`w-full p-2 border-[2px] border-input rounded-[8px] placeholder:text-[16px] placeholder:leading-[20px] ${
            errors[`${exam}-overall`] ? 'border-red-500' : ''
          }`}
          placeholder={`Enter ${exam} Overall Score`}
          {...register(`${exam}-overall`, {
            required: `${exam} overall score is required`,
            pattern: {
              value: /^[0-9](\.[05])?$/, // Regular expression for 0-9 or 0.5-9.5
              message: `${exam} overall score must be between ${overall.min}-${overall.max}`
            }
          })}
        />
        {errors[`${exam}-overall`] && (
          <span className='text-red-500 text-[12px] leading-[18px] mt-1'>{errors[`${exam}-overall`].message}</span>
        )}
      </div>
    </div>
  )
}

export default ExamInput
