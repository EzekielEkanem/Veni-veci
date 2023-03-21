const Gallery = ({ images, name, breed }) => {

    return (
      <div>
        <h2> What we have seen so far!</h2>
        <div className="image-container">
            {images && images.length > 0 ? (
                images.map((pic, index) => (
                    <li className="gallery" key={index}>
                      <img
                        className="gallery-screenshot"
                        src={pic}
                        alt="Undefined screenshot from query"
                        width="100"
                      />
                      <p>A {name} from {breed} breed group</p>
                    </li>
                  )
                    
                )
            ) : (
                <div>
                    <h3>You haven't made viewed a dog yet!</h3>
                </div>
            )}
        </div>

      </div>
    );
  };
  
  export default Gallery;