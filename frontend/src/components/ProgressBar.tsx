type ProgressBarProps = {
  value: number;
  goal: number;
};

export function ProgressBar(props: ProgressBarProps) {
  const percentage = (props.value / props.goal) * 100;

  return (
    <div className="w-full bg-gray-100 h-full">
      <div
        className="bg-green-300 h-full p-1"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
