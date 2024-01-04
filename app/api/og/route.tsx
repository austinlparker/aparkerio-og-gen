import { ImageResponse } from 'next/og';

export const runtime = 'edge';
 
export async function GET(request: Request) {
   // Make sure the font exists in the specified path:
  const titleFontData = await fetch(
    new URL('../../../assets/ChiKareGo2.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  const { searchParams } = new URL(request.url);
 
  // ?title=<title>
  const hasTitle = searchParams.has('title');
  const title = hasTitle
    ? searchParams.get('title')?.slice(0, 100)
    : 'Default Title';

  function Label({ children }) {
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