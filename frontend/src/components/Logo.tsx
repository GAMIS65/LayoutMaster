export default function Logo() {
  const logoChars = [
    { char: 'L', color: 'text-yellow-300' },
    { char: 'a', color: 'text-red-300' },
    { char: 'y', color: 'text-purple-300' },
    { char: 'o', color: 'text-yellow-300' },
    { char: 'u', color: 'text-purple-300' },
    { char: 't', color: 'text-green-300' },
    { char: 'M', color: 'text-purple-300' },
    { char: 'a', color: 'text-red-300' },
    { char: 's', color: 'text-orange-300' },
    { char: 't', color: 'text-green-300' },
    { char: 'e', color: 'text-blue-300' },
    { char: 'r', color: 'text-green-300' },
  ];

  return (
    <div className="text-shadow-sm">
      {logoChars.map((item, index) => (
        <span
          key={index}
          className={`${item.color} inline-block transition-transform duration-150 ease-out hover:-translate-y-1`}
        >
          {item.char}
        </span>
      ))}
    </div>
  );
}
