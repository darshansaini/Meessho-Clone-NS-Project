
import Header from "../component/Header";
import List from "../List/List";
import SetItem from "../State/SetItem";


function AllProduct() {
    return (
        <div>
            <SetItem>
                <div style={{ marginTop: "200px" }}></div>
                <Header />
                <List />
            </SetItem>
        </div>
    )
}

export default AllProduct
