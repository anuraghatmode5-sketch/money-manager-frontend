import "./CategoryList.css";
import { Layers2, Pencil } from "lucide-react";

const CategoryList = ({ categories, onEditCategory, onDeleteCategory }) => {
    return (
        
    <div className="category-card">
        <div className="category-card-header">
            <h4 className="category-card-title">
                Category Sources
            </h4>
        </div>

        {/* Category List */}
        {categories.length === 0 ? (
         <p className="no-categories">
        No categories added yet. Add some to get started!
         </p>
        ) : (
        <div className="category-grid">
            {categories.map((category) => (
                 
                 <div key={category.id} className="category-item">
                        
                        <div className="category-icon">
                                {category.icon ? (
                                  <span className="category-icon-image">
                                      <img
                                          src={category.icon}
                                          alt={category.name}
                                          className="category-image"
                                      />
                                        </span>
                                    ) : (
                                        <Layers2 className="text-primary" size={24} />
                                )}
                        </div>

                        {/* Category Details */}
                        <div className="category-details">
                             <div>
                                     <p className="category-name">
                                         {category.name}
                                     </p>
                             
                                     <p className="category-type">
                                         {category.type}
                                     </p>
                                 </div>

                                   <div className="category-actions">
                                       <button onClick={() => onEditCategory(category)} className="category-action-btn">
                                          <Pencil size={18} />
                                       </button>
                                    </div>

                             </div> 




                 </div>

            ))}
        </div>
)}
    </div>

    );
};

export default CategoryList;