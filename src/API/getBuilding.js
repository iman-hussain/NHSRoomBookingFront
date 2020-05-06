const GetBuilding = async (building_id) => {
    const buildingResponse = await fetch(
        "http://localhost:5000/building/"+building_id
      );
      const responseData = await buildingResponse.json();
      let building = responseData.rows.rows;
      return building;
}

export default GetBuilding
