class ChangeColumnToMessage < ActiveRecord::Migration[5.0]
  def change

    def up
      change_column_null :messages, :content, false
      change_column :messages, :content
      change_column_null :messages, :image, false
      change_column :messages, :image
    end
  
    def down
      change_column_null :messages, :content, true, nil
      change_column :messages, :content,default: nil
      change_column_null :messages, :image, true, nil
      change_column :messages, :image,default: nil
    end
    
  end
end
