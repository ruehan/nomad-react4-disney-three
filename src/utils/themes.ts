export interface Theme {
    cardBackground: string;
    background: string;
    border: string;
    text: string;
    hoverBorder: string;
    hoverText: string;
    hoverCardBackground: string;
  }

  export const lightTheme: Theme = {
    cardBackground: '#f4f7f8',
    background: 'white',
    border: '1px solid #f4f7f8',
    text: 'black',
    hoverBorder: '#6B8096',
    hoverText: "white",
    hoverCardBackground: '#272829',
  };
  
  export const darkTheme: Theme = {
    cardBackground: '#272829',
    background: 'black',
    border: '1px solid #272829',
    text: 'white',
    hoverBorder: '#FFF',
    hoverText: "black",
    hoverCardBackground: '#f4f7f8',
  };
  
  