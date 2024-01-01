'use client';

// import { useRouter } from '../../../../dist';
import { useRouter } from 'next13-progressbar';

const SearchPage = () => {
  const router = useRouter();
  return (
    <div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i}>
          {/* <Link href={`/search?item=${i}`}>Item {i}</Link> */}
          <button onClick={() => router.push(`/search?item=${i}`)}>Item {i}</button>
        </div>
      ))}
    </div>
  );
};

export default SearchPage;
