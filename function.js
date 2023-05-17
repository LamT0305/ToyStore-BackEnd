const paginate = async (model, page, limit, populate) => {
  try {
    const results = await model
      .find()
      .populate(populate)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const count = await model.countDocuments().exec();
    const totalPages = Math.ceil(count / limit);

    return {
      results: results,
      page: page,
      totalPages: totalPages,
      totalCount: count,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = { paginate };