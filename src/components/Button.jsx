export default function Button({value, type="number",onClick}){
    const base = `
        flex items-center justify-center 
        font-semibold 
        rounded-full 
        shadow`
    ;

    const size = `
        w-full 
        aspect-square
    `;

    let color = "";

    switch(type){
        case 'operator': color="bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white"; break;
        case 'special':   color = "bg-gray-600 hover:bg-gray-500 active:bg-gray-700 text-white"; break;
        case 'function':  color = "bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white"; break;
        default:          color = "bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white"; 
    }


    return (
        <button
        onClick={() => onClick(value)}
        className={`${base} ${size} ${color} transition`}
        >
        {value}
        </button>
    )
}