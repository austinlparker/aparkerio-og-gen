import { ImageResponse } from 'next/og';

export const runtime = 'edge';
 
export async function GET(request: Request) {
   // Make sure the font exists in the specified path:
  const titleFontData = await fetch(
    new URL('../../../assets/ChiKareGo2.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  const { searchParams } = new URL(request.url);
 
  // ?title=<title>
  const rawTitle = decodeURIComponent(searchParams.get('title')?.slice(0, 100) || '');
  const title = rawTitle.split('.').slice(0, -1).join('.') || 'Read more on the blog!';

  function Label({ children }: { children: React.ReactNode }) {
    return <label style={{
      fontFamily: 'Chicago_12',
      fontSize: 100,
      color: 'black',
      margin: '25px 0 10px',
    }}>{children}</label>
  }
  
  return new ImageResponse(
    (
      <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: '10px 20px',
        justifyContent: 'center',
        fontFamily: 'Noto Sans',
        fontSize: 70,
        backgroundImage: `url('http://staging.aparker.io/wp-content/uploads/2024/01/background-og-1200-630.png')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Label>{title}</Label>
    </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Chicago_12',
          data: titleFontData,
          style: 'normal',
        },
      ],
    },
  );
}