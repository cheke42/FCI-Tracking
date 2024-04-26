import ListGroup from 'react-bootstrap/ListGroup';

export function MenuGraph({fondos,MenuItemHandler}){
    return (
        <ListGroup  className='text-center border list-group-fund' variant="flush">
            <ListGroup.Item style={{cursor: "pointer"}} value={0} onClick={((ev) => MenuItemHandler(ev,{title: "🚩 RESUMEN GENERAL"}))}>Resumen General</ListGroup.Item>
            {fondos && fondos.map((fondo) => (
                <ListGroup.Item style={{cursor: "pointer"}} value={fondo.ticker} key={"fund-"+fondo.ticker} title={fondo.title} onClick={((ev) => MenuItemHandler(ev,fondo))}>{fondo.ticker}</ListGroup.Item>
            ))}
        </ListGroup>
    )
}