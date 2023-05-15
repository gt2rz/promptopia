import PromptCard from "./PromptCard"

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 class="head_text text-left">
        <span className="blue_gradient">{ name } Profile </span>
      </h1>

      <p classNane="desc text-left">{desc}</p>

      <div className='mt-19 prompt_layout'>
        { data.map( post => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))
        }
      </div>

    </section>
  )
}

export default Profile